<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactmessageRequest;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    /**
     * GET /contact — public contact form page.
     */
    public function create()
    {
        return Inertia::render('contact');
    }

    /**
     * POST /contact — store message, redirect with flash.
     */
    public function store(StoreContactmessageRequest $request)
    {

        ContactMessage::create($request->validated());

        return redirect()
            ->route('contact.create')
            ->with('flash', [
                'type' => 'success',
                'message' => 'Your message has been received. We will respond within 1–2 working days.',
            ]);
    }

    /**
     * GET /admin/notifications — paginated list for admin.
     */
    public function index()
    {
        $messages = ContactMessage::latest()
            ->paginate(20);

        $unreadCount = ContactMessage::whereNull('read_at')->count();

        return Inertia::render('admin/notifications', [
            'messages' => $messages,
            'unreadCount' => $unreadCount,
        ]);
    }

    /**
     * PATCH /admin/notifications/{message}/read — mark as read.
     */
    public function markRead(ContactMessage $message)
    {
        $message->update([
            'read_at' => now(),
            'read_by' => Auth::id(),
        ]);

        return back();
    }

    /**
     * PATCH /admin/notifications/read-all — mark all as read.
     */
    public function markAllRead()
    {
        ContactMessage::whereNull('read_at')->update([
            'read_at' => now(),
            'read_by' => Auth::id(),
        ]);

        return back();
    }
}
